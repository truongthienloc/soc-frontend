.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x4 , x0 , 4 
		add     x3 , x0 , x0 
		add     x9 , x0 , x0 
		addi    x20 , x0 , 44 
		addi    x11 , x0 , 2 
InArr:
		addi    x16 , x0 , 48 
		addi    x28 , x0 , 12 
		addi    x27 , x0 , 56 
		addi    x7 , x0 , 8 
		sb      x16 , 52 (x20) 
		sb      x28 , 56 (x20) 
		sb      x27 , 60 (x20) 
		sb      x7 , 64 (x20) 
Loop:
		sll     x6 , x9 , x11 
		add     x1 , x6 , x20 
		lbu     x30 , 52 (x1) 
		add     x3 , x3 , x30 
		addi    x9 , x9 , 1 
		beq     x9 , x4 , Result 
		jal     x0 , Loop 
Result:
		addi    x18 , x0 , 124 
		bne     x18 , x3 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
