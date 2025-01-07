.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		lui     x21 , 8 
		lui     x12 , 9 
		lui     x27 , 1 
		lui     x10 , 4 
		sw      x2 , 92 (x21) 
		sw      x17 , 96 (x12) 
		sw      x6 , 100 (x27) 
		sw      x25 , 104 (x10) 
		lw      x31 , 104 (x10) 
		lw      x26 , 100 (x27) 
		lw      x11 , 96 (x12) 
		lw      x30 , 92 (x21) 
		bne     x30 , x2 , Fail
		bne     x11 , x17 , Fail
		bne     x26 , x6 , Fail
		bne     x31 , x25 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
