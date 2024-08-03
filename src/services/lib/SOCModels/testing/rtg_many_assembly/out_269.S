.text

#The program checks the ALU instruction in I_type

Main:
		addi    x19 , x0 , 157 
		addi    x17 , x0 , 7 
		addi    x1 , x0 , 57 
		bltu    x19 , x17 , Less_i 
		bgeu    x19 , x17 , Bigger_i 
Less_i:
		addi    x23 , x1 , 41 
		andi    x7 , x1 , 1 
		add     x7 , x7 , x23 
		srli    x7 , x7 , 1 
		addi    x28 , x0 , 49 
		bne     x7 , x28 , Fail 
Bigger_i:
		ori     x23 , x1 , 0 
		xori    x7 , x1 , 38 
		add     x7 , x7 , x23 
		srai    x7 , x7 , 4 
		addi    x28 , x0 , 5 
		bne     x7 , x28 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
