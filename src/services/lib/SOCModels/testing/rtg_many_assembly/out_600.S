.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		auipc    x26 , 0
		auipc    x28 , 8
		auipc    x9 , 9
		auipc    x23 , 1
		lui      x18 , 5
		lui      x4 , 5
		lui      x6 , 8
		lui      x7 , 8
		sw       x12 , 104 (x26) 
		sw       x15 , 108 (x28) 
		sw       x17 , 112 (x9) 
		sw       x25 , 116 (x23) 
		sw       x20 , 120 (x18) 
		sw       x31 , 124 (x4) 
		sw       x1 , 128 (x6) 
		sw       x8 , 132 (x7) 
		lw       x5 , 132 (x7) 
		lw       x27 , 128 (x6) 
		lw       x24 , 124 (x4) 
		lw       x11 , 120 (x18) 
		lw       x13 , 116 (x23) 
		lw       x19 , 112 (x9) 
		lw       x2 , 108 (x28) 
		lw       x10 , 104 (x26) 
		bne      x10 , x12 , Fail
		bne      x2 , x15 , Fail
		bne      x19 , x17 , Fail
		bne      x13 , x25 , Fail
		bne      x11 , x20 , Fail
		bne      x24 , x31 , Fail
		bne      x27 , x1 , Fail
		bne      x5 , x8 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
