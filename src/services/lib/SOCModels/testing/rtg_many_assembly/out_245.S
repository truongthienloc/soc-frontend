.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		lui     x31 , 3 
		lui     x11 , 8 
		lui     x3 , 4 
		lui     x30 , 4 
		sw      x6 , 4 (x31) 
		sw      x2 , 8 (x11) 
		sw      x10 , 12 (x3) 
		sw      x12 , 16 (x30) 
		lw      x9 , 16 (x30) 
		lw      x27 , 12 (x3) 
		lw      x15 , 8 (x11) 
		lw      x5 , 4 (x31) 
		bne     x5 , x6 , Fail
		bne     x15 , x2 , Fail
		bne     x27 , x10 , Fail
		bne     x9 , x12 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
