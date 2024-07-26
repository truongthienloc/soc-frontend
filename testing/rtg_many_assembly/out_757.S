.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x29 , x0 , 4 
		addi    x22 , x0 , 0 
		addi    x2 , x0 , 0 
		addi    x28 , x0 , 72 
InArr:
		addi    x21 , x0 , 28 
		addi    x7 , x0 , 28 
		addi    x8 , x0 , 12 
		addi    x26 , x0 , 44 
		sh      x21 , 44 (x28) 
		sh      x7 , 48 (x28) 
		sh      x8 , 52 (x28) 
		sh      x26 , 56 (x28) 
Loop:
		slli    x20 , x2 , 2 
		add     x23 , x20 , x28 
		lh      x25 , 44 (x23) 
		add     x22 , x22 , x25 
		addi    x2 , x2 , 1 
		beq     x2 , x29 , Result 
		jal     x0 , Loop 
Result:
		addi    x24 , x0 , 112 
		bne     x24 , x22 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
