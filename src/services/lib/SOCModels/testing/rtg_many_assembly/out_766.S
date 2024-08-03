.text

#The program checks the ALU instruction in I_type

Main:
		addi    x19 , x0 , 146 
		addi    x14 , x0 , 145 
		sltu    x4 , x19 , x14 
		bltu    x19 , x14 , Less_i 
		bgeu    x19 , x14 , Bigger_i 
Less_i:
		ori     x15 , x19 , 46 
		sub     x17 , x14 , x19 
		srai    x17 , x17 , 0 
		and     x17 , x17 , x0 
		addi    x24 , x0 , 0 
		beq     x17 , x24 , Pass 
Bigger_i:
		ori     x15 , x19 , 172 
		sub     x17 , x14 , x19 
		srai    x17 , x17 , 3 
		and     x17 , x17 , x0 
		addi    x24 , x0 , 0 
		beq     x17 , x24 , Less_i 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
