.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x26 , x0 , 4 
		add     x4 , x0 , x0 
		add     x9 , x0 , x0 
		addi    x2 , x0 , 36 
		addi    x22 , x0 , 2 
InArr:
		addi    x28 , x0 , 44 
		addi    x20 , x0 , 52 
		addi    x10 , x0 , 16 
		addi    x11 , x0 , 44 
		sb      x28 , 48 (x2) 
		sb      x20 , 52 (x2) 
		sb      x10 , 56 (x2) 
		sb      x11 , 60 (x2) 
Loop:
		sll     x27 , x9 , x22 
		add     x6 , x27 , x2 
		lbu     x25 , 48 (x6) 
		add     x4 , x4 , x25 
		addi    x9 , x9 , 1 
		beq     x9 , x26 , Result 
		jal     x0 , Loop 
Result:
		addi    x7 , x0 , 156 
		bne     x7 , x4 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
