.text

#The program checks the ALU instruction in I_type

Main:
		addi    x4 , x0 , 151 
		addi    x3 , x0 , 150 
		sltu    x23 , x4 , x3 
		bltu    x4 , x3 , Less_i 
		bgeu    x4 , x3 , Bigger_i 
Less_i:
		ori     x16 , x4 , 20 
		sub     x1 , x3 , x4 
		srai    x1 , x1 , 1 
		and     x1 , x1 , x0 
		addi    x20 , x0 , 0 
		beq     x1 , x20 , Pass 
Bigger_i:
		ori     x16 , x4 , 116 
		sub     x1 , x3 , x4 
		srai    x1 , x1 , 3 
		and     x1 , x1 , x0 
		addi    x20 , x0 , 0 
		beq     x1 , x20 , Less_i 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
