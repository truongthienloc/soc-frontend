.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x29 , x0 , 4 
		addi    x2 , x0 , 0 
		addi    x27 , x0 , 0 
		addi    x6 , x0 , 0 
InArr:
		addi    x21 , x0 , 12 
		addi    x9 , x0 , 4 
		addi    x26 , x0 , 8 
		addi    x10 , x0 , 8 
		sh      x21 , 44 (x6) 
		sh      x9 , 48 (x6) 
		sh      x26 , 52 (x6) 
		sh      x10 , 56 (x6) 
Loop:
		slli    x8 , x27 , 2 
		add     x20 , x8 , x6 
		lh      x14 , 44 (x20) 
		add     x2 , x2 , x14 
		addi    x27 , x27 , 1 
		beq     x27 , x29 , Result 
		jal     x0 , Loop 
Result:
		addi    x28 , x0 , 32 
		bne     x28 , x2 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
