.text

#The program checks the ALU instruction in I_type

Main:
		addi    x19 , x0 , 151 
		addi    x7 , x0 , 150 
		sltu    x12 , x19 , x7 
		bltu    x19 , x7 , Less_i 
		bgeu    x19 , x7 , Bigger_i 
Less_i:
		ori     x17 , x19 , 87 
		sub     x1 , x7 , x19 
		srai    x1 , x1 , 1 
		and     x1 , x1 , x0 
		addi    x31 , x0 , 0 
		beq     x1 , x31 , Pass 
Bigger_i:
		ori     x17 , x19 , 44 
		sub     x1 , x7 , x19 
		srai    x1 , x1 , 2 
		and     x1 , x1 , x0 
		addi    x31 , x0 , 0 
		beq     x1 , x31 , Less_i 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
