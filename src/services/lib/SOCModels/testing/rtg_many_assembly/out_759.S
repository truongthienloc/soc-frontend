.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		lui      x6 , 3
		lui      x29 , 0
		lui      x8 , 1
		lui      x7 , 2
		lui      x24 , 3
		lui      x31 , 5
		lui      x17 , 4
		lui      x27 , 0
		sw       x26 , 32 (x6) 
		sw       x20 , 36 (x29) 
		sw       x28 , 40 (x8) 
		sw       x3 , 44 (x7) 
		sw       x19 , 48 (x24) 
		sw       x4 , 52 (x31) 
		sw       x14 , 56 (x17) 
		sw       x5 , 60 (x27) 
		lw       x12 , 60 (x27) 
		lw       x13 , 56 (x17) 
		lw       x16 , 52 (x31) 
		lw       x2 , 48 (x24) 
		lw       x21 , 44 (x7) 
		lw       x25 , 40 (x8) 
		lw       x18 , 36 (x29) 
		lw       x10 , 32 (x6) 
		bne      x10 , x26 , Fail
		bne      x18 , x20 , Fail
		bne      x25 , x28 , Fail
		bne      x21 , x3 , Fail
		bne      x2 , x19 , Fail
		bne      x16 , x4 , Fail
		bne      x13 , x14 , Fail
		bne      x12 , x5 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
