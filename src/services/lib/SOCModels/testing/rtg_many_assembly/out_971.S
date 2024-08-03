.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		lui     x21 , 9 
		lui     x25 , 8 
		lui     x29 , 9 
		lui     x5 , 9 
		sw      x3 , 72 (x21) 
		sw      x16 , 76 (x25) 
		sw      x15 , 80 (x29) 
		sw      x26 , 84 (x5) 
		lw      x12 , 84 (x5) 
		lw      x14 , 80 (x29) 
		lw      x24 , 76 (x25) 
		lw      x20 , 72 (x21) 
		bne     x20 , x3 , Fail
		bne     x24 , x16 , Fail
		bne     x14 , x15 , Fail
		bne     x12 , x26 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
