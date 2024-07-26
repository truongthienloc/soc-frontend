.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		lui     x17 , 9 
		lui     x30 , 6 
		lui     x10 , 2 
		lui     x27 , 2 
		sw      x12 , 4 (x17) 
		sw      x15 , 8 (x30) 
		sw      x21 , 12 (x10) 
		sw      x6 , 16 (x27) 
		lw      x3 , 16 (x27) 
		lw      x24 , 12 (x10) 
		lw      x29 , 8 (x30) 
		lw      x18 , 4 (x17) 
		bne     x18 , x12 , Fail
		bne     x29 , x15 , Fail
		bne     x24 , x21 , Fail
		bne     x3 , x6 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
