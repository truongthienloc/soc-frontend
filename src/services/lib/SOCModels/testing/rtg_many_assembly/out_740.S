.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		lui     x12 , 3 
		lui     x27 , 7 
		lui     x26 , 2 
		lui     x14 , 8 
		sw      x10 , 20 (x12) 
		sw      x5 , 24 (x27) 
		sw      x8 , 28 (x26) 
		sw      x18 , 32 (x14) 
		lw      x23 , 32 (x14) 
		lw      x4 , 28 (x26) 
		lw      x17 , 24 (x27) 
		lw      x21 , 20 (x12) 
		bne     x21 , x10 , Fail
		bne     x17 , x5 , Fail
		bne     x4 , x8 , Fail
		bne     x23 , x18 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
