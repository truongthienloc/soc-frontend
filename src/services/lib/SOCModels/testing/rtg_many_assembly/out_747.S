.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x4 , x0 , 4 
		add     x15 , x0 , x0 
		add     x28 , x0 , x0 
		addi    x9 , x0 , 40 
		addi    x7 , x0 , 2 
InArr:
		addi    x26 , x0 , 24 
		addi    x29 , x0 , 52 
		addi    x31 , x0 , 76 
		addi    x1 , x0 , 8 
		sh      x26 , 48 (x9) 
		sh      x29 , 52 (x9) 
		sh      x31 , 56 (x9) 
		sh      x1 , 60 (x9) 
Loop:
		sll     x30 , x28 , x7 
		add     x23 , x30 , x9 
		lhu     x25 , 48 (x23) 
		add     x15 , x15 , x25 
		addi    x28 , x28 , 1 
		beq     x28 , x4 , Result 
		jal     x0 , Loop 
Result:
		addi    x22 , x0 , 160 
		bne     x22 , x15 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
