.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x10 , x0 , 4 
		add     x22 , x0 , x0 
		add     x29 , x0 , x0 
		addi    x25 , x0 , 64 
		addi    x1 , x0 , 2 
InArr:
		addi    x13 , x0 , 8 
		addi    x30 , x0 , 64 
		addi    x3 , x0 , 16 
		addi    x9 , x0 , 8 
		sh      x13 , 12 (x25) 
		sh      x30 , 16 (x25) 
		sh      x3 , 20 (x25) 
		sh      x9 , 24 (x25) 
Loop:
		sll     x23 , x29 , x1 
		add     x7 , x23 , x25 
		lhu     x8 , 12 (x7) 
		add     x22 , x22 , x8 
		addi    x29 , x29 , 1 
		beq     x29 , x10 , Result 
		jal     x0 , Loop 
Result:
		addi    x20 , x0 , 96 
		bne     x20 , x22 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
