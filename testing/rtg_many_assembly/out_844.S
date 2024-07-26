.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x27 , x0 , 4 
		addi    x9 , x0 , 0 
		addi    x28 , x0 , 0 
		addi    x3 , x0 , 4 
InArr:
		addi    x22 , x0 , 4 
		addi    x20 , x0 , 16 
		addi    x13 , x0 , 12 
		addi    x26 , x0 , 8 
		sh      x22 , 40 (x3) 
		sh      x20 , 44 (x3) 
		sh      x13 , 48 (x3) 
		sh      x26 , 52 (x3) 
Loop:
		slli    x6 , x28 , 2 
		add     x12 , x6 , x3 
		lh      x25 , 40 (x12) 
		add     x9 , x9 , x25 
		addi    x28 , x28 , 1 
		beq     x28 , x27 , Result 
		jal     x0 , Loop 
Result:
		addi    x7 , x0 , 40 
		bne     x7 , x9 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
