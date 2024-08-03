.text

#The program checks the ALU instruction in I_type

Main:
		addi    x14 , x0 , 164 
		addi    x19 , x0 , 163 
		sltu    x15 , x14 , x19 
		bltu    x14 , x19 , Less_i 
		bgeu    x14 , x19 , Bigger_i 
Less_i:
		ori     x28 , x14 , 195 
		sub     x6 , x19 , x14 
		srai    x6 , x6 , 4 
		and     x6 , x6 , x0 
		addi    x4 , x0 , 0 
		beq     x6 , x4 , Pass 
Bigger_i:
		ori     x28 , x14 , 145 
		sub     x6 , x19 , x14 
		srai    x6 , x6 , 1 
		and     x6 , x6 , x0 
		addi    x4 , x0 , 0 
		beq     x6 , x4 , Less_i 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
