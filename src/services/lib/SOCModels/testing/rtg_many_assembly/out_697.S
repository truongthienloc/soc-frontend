.text

#The program checks the ALU instruction in I_type

Main:
		addi    x22 , x0 , 154 
		addi    x12 , x0 , 121 
		addi    x9 , x0 , 92 
		bltu    x22 , x12 , Less_i 
		bgeu    x22 , x12 , Bigger_i 
Less_i:
		addi    x7 , x9 , 74 
		andi    x5 , x9 , 194 
		add     x5 , x5 , x7 
		srli    x5 , x5 , 1 
		addi    x8 , x0 , 115 
		bne     x5 , x8 , Fail 
Bigger_i:
		ori     x7 , x9 , 35 
		xori    x5 , x9 , 181 
		add     x5 , x5 , x7 
		srai    x5 , x5 , 3 
		addi    x8 , x0 , 45 
		bne     x5 , x8 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
