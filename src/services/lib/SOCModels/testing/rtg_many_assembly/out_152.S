.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		auipc    x29 , 2
		auipc    x26 , 8
		auipc    x4 , 9
		auipc    x17 , 3
		lui      x5 , 5
		lui      x30 , 0
		lui      x9 , 0
		lui      x23 , 1
		sw       x28 , 96 (x29) 
		sw       x31 , 100 (x26) 
		sw       x6 , 104 (x4) 
		sw       x27 , 108 (x17) 
		sw       x10 , 112 (x5) 
		sw       x15 , 116 (x30) 
		sw       x12 , 120 (x9) 
		sw       x21 , 124 (x23) 
		lw       x25 , 124 (x23) 
		lw       x24 , 120 (x9) 
		lw       x3 , 116 (x30) 
		lw       x2 , 112 (x5) 
		lw       x8 , 108 (x17) 
		lw       x22 , 104 (x4) 
		lw       x1 , 100 (x26) 
		lw       x19 , 96 (x29) 
		bne      x19 , x28 , Fail
		bne      x1 , x31 , Fail
		bne      x22 , x6 , Fail
		bne      x8 , x27 , Fail
		bne      x2 , x10 , Fail
		bne      x3 , x15 , Fail
		bne      x24 , x12 , Fail
		bne      x25 , x21 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
