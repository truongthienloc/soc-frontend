.text

#The program checks the ALU instruction in I_type

Main:
		addi    x22 , x0 , 85 
		addi    x13 , x0 , 120 
		addi    x6 , x0 , 3 
		bltu    x22 , x13 , Less_i 
		bgeu    x22 , x13 , Bigger_i 
Less_i:
		addi    x31 , x6 , 198 
		andi    x3 , x6 , 115 
		add     x3 , x3 , x31 
		srli    x3 , x3 , 1 
		addi    x7 , x0 , 102 
		bne     x3 , x7 , Fail 
Bigger_i:
		ori     x31 , x6 , 161 
		xori    x3 , x6 , 31 
		add     x3 , x3 , x31 
		srai    x3 , x3 , 0 
		addi    x7 , x0 , 191 
		bne     x3 , x7 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
