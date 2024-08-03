.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		lui      x17 , 6
		lui      x24 , 1
		lui      x26 , 6
		lui      x21 , 2
		lui      x28 , 0
		lui      x31 , 5
		lui      x7 , 4
		lui      x25 , 9
		sw       x12 , 0 (x17) 
		sw       x30 , 4 (x24) 
		sw       x9 , 8 (x26) 
		sw       x19 , 12 (x21) 
		sw       x8 , 16 (x28) 
		sw       x23 , 20 (x31) 
		sw       x3 , 24 (x7) 
		sw       x27 , 28 (x25) 
		lw       x14 , 28 (x25) 
		lw       x18 , 24 (x7) 
		lw       x29 , 20 (x31) 
		lw       x10 , 16 (x28) 
		lw       x13 , 12 (x21) 
		lw       x11 , 8 (x26) 
		lw       x5 , 4 (x24) 
		lw       x16 , 0 (x17) 
		bne      x16 , x12 , Fail
		bne      x5 , x30 , Fail
		bne      x11 , x9 , Fail
		bne      x13 , x19 , Fail
		bne      x10 , x8 , Fail
		bne      x29 , x23 , Fail
		bne      x18 , x3 , Fail
		bne      x14 , x27 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
