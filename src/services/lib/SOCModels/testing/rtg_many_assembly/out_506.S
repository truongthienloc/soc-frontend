.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		lui     x7 , 4 
		lui     x13 , 8 
		lui     x18 , 3 
		lui     x8 , 4 
		sw      x19 , 64 (x7) 
		sw      x9 , 68 (x13) 
		sw      x24 , 72 (x18) 
		sw      x20 , 76 (x8) 
		lw      x16 , 76 (x8) 
		lw      x3 , 72 (x18) 
		lw      x17 , 68 (x13) 
		lw      x30 , 64 (x7) 
		bne     x30 , x19 , Fail
		bne     x17 , x9 , Fail
		bne     x3 , x24 , Fail
		bne     x16 , x20 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
