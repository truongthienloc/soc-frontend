.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x9 , x0 , 4 
		add     x19 , x0 , x0 
		add     x23 , x0 , x0 
		addi    x22 , x0 , 52 
		addi    x28 , x0 , 2 
InArr:
		addi    x31 , x0 , 12 
		addi    x25 , x0 , 76 
		addi    x6 , x0 , 64 
		addi    x3 , x0 , 44 
		sh      x31 , 44 (x22) 
		sh      x25 , 48 (x22) 
		sh      x6 , 52 (x22) 
		sh      x3 , 56 (x22) 
Loop:
		sll     x30 , x23 , x28 
		add     x1 , x30 , x22 
		lhu     x17 , 44 (x1) 
		add     x19 , x19 , x17 
		addi    x23 , x23 , 1 
		beq     x23 , x9 , Result 
		jal     x0 , Loop 
Result:
		addi    x10 , x0 , 196 
		bne     x10 , x19 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
